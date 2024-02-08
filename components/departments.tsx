"use client"

import {config} from "@/components/Constants";
import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import DepartmentContainer from "@/components/departmentContainer";
import {Department, Lector} from "@/components/model/model";

// async function getData() {
//     const res= await fetch(`${config.url.API_BASE_URL}/department/all`);
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.
//
//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error('Failed to fetch data')
//     }
//
//     return res.json()
// }

function reducer(state: Department[] | null, action: any) {
    const payload = action.payload;
    if (action.type === 'init') {
        return payload;
    }
    if (action.type === 'update') {
        if (state !== null) {
            const updatedDepartments = state.map(department => {
                if (department.id === payload.departmentId) {
                    return {
                        ...department,
                        lectors: department.lectors.map(lector => {
                            if (lector.id === payload.lectorId) {
                                return {
                                    ...lector,
                                    name: payload.name
                                };
                            }
                            return lector;
                        })
                    };
                }
                return department;
            });
            return updatedDepartments;
        }
    }
    throw Error('Unknown action.');
}


export default function Departments() {
    // const [departments, setDepartments] = useState<Department[] | null>(null);
    const [departments, dispatch] = useReducer(reducer, null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get(`${config.url.API_BASE_URL}/department/all`)
            .then(res => {
                console.log(res);
                dispatch({type: "init", payload: res.data});
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            {isLoading && <div>Loading</div>}
            {!!departments &&
                <div className="w-full flex">
                    <div className="flex flex-wrap gap-7 justify-center">
                        {
                            departments.map(item =>
                                <DepartmentContainer
                                    key={item.id}
                                    department={item}
                                    updateDepartment={dispatch}
                                />)
                        }
                    </div>
                </div>
            }


        </>);
}