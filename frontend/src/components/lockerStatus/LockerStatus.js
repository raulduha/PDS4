import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LockerStatus.css';
import {
    IoTDataPlaneClient,
    GetThingShadowCommand,

  } from "@aws-sdk/client-iot-data-plane"

import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts"

const AWSSection = ({ setAWSLockers }) => {
    const accessKeyId = "AKIAU6BRFNUSIDVECJFA";
    const secretAccessKey = "VkOxLcmnEa1knLpb6op47hOn7HSMKWE28R8ogkg3";

    const exampleJSON = {
        "roles": [
          {
            "roleArn": "arn:aws:iam::339405532452:role/pds_12",
            "awsRegion": "us-east-2",
            "externalId": "4704c389e3fe44e895b5",
            "thingName": "my_esp_lamp"
          },
          {
            "roleArn": "arn:aws:iam::638141874484:role/pds-p3-role-share",
            "awsRegion": "sa-east-1",
            "externalId": "EB8SGcKqUd3AiNWBopGFwIVF0xkqQW",
            "thingName": "EVT2xB96Dx2gyO2ltRbuB"
          },
          {
            "roleArn": "arn:aws:iam::078243114425:role/pds-group-role",
            "awsRegion": "us-east-2",
            "externalId": "G9",
            "thingName": "document_bank"
          }]
    }

    useEffect(() => {
        const fetchAWSShadow = async (userInfo) => {
            try {
                const sts = new STSClient({
                    region: "us-east-2",
                    credentials: { accessKeyId, secretAccessKey }
                });

                const assumeRoleCommand = new AssumeRoleCommand({
                    RoleArn: userInfo.roleArn,
                    ExternalId: userInfo.externalId,
                    RoleSessionName: "session"
                });

                const assumedRole = await sts.send(assumeRoleCommand);

                if (!assumedRole) {
                    throw new Error('Error assuming role');
                }

                const assumedCredentials = {
                    accessKeyId: assumedRole.Credentials.AccessKeyId,
                    secretAccessKey: assumedRole.Credentials.SecretAccessKey,
                    sessionToken: assumedRole.Credentials.SessionToken
                };

                const iotHandler = new IoTDataPlaneClient({
                    region: userInfo.awsRegion,
                    credentials: assumedCredentials
                });

                const params = { thingName: userInfo.thingName };
                const getShadowCommand = new GetThingShadowCommand(params);
                const shadow = await iotHandler.send(getShadowCommand);

                if (!shadow) {
                    throw new Error('Error getting shadow from AWS IoT');
                }
                const payload = new TextDecoder().decode(shadow.payload)
                const lockerState = JSON.parse(payload);

                console.log(lockerState.state.desired);

                const awsLockers = Object.keys(lockerState.state.reported.lockers).map(
                    lockerId => ({
                      id: lockerId,
                      lock: lockerState.state.reported.lockers[lockerId].lock,
                      door: lockerState.state.reported.lockers[lockerId].door,
                      content: lockerState.state.reported.lockers[lockerId].content,
                    })
                  );
                
                  setAWSLockers((prevLockers) => [
                    ...prevLockers,
                    { [userInfo.thingName]: awsLockers },
                  ]);

            } catch (error) {
                console.error('An error occurred:', error.message);
            }
        };
        exampleJSON.roles.forEach((items) => {
            fetchAWSShadow(items);
        });

    }, [])
    return null;
};

// Componente principal que muestra los datos de Vercel
const LockerStatus = () => {
    const [AWSLockers, setAWSLockers] = useState([]);
    const [VercelLockers, setVercelLockers] = useState([]);

    useEffect(() => {
        axios.get('https://backend-p3.vercel.app/lockers/')
            .then(response => {
                console.log('Respuesta del servidor (Vercel):', response.data);
                setVercelLockers(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos desde el servidor:', error);
            });
    }, []);

    return (
        <div className="containerCentered">
            <div className="lockerStatus">
                <h3>Estado de los Lockers (AWS)</h3>
                <AWSSection setAWSLockers={setAWSLockers} />
                {AWSLockers.map(locker => (
                    <div className="tableWrapper">
                        <table className="lockerTable">
                            <thead>
                                <tr className="tableHeader">
                                    <th>Locker_ID</th>
                                    <th>Estado_Candado</th>
                                    <th>Estado_Puerta</th>
                                    <th>Contenido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {AWSLockers.map(locker => (
                                    <tr key={locker.id} className="lockerItem">
                                        <td>{locker.id}</td>
                                        <td>{locker.lock}</td>
                                        <td>{locker.door}</td>
                                        <td>{locker.content}</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            <div className="lockerStatus">
                <h3>Estado de los Lockers (Vercel)</h3>
                <div className="tableWrapper">
                    <table className="lockerTable">
                        <thead>
                            <tr className="tableHeader">
                                <th>Locker_ID</th>
                                <th>Estados</th>
                                <th>Cliente_Email</th>
                                <th>Operador_Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VercelLockers.map(locker => (
                                <tr key={locker.locker_id} className="lockerItem">
                                    <td>{locker.locker_id}</td>
                                    <td>{locker.locker_status}</td>
                                    <td>{locker.client_email}</td>
                                    <td>{locker.operator_email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LockerStatus;
