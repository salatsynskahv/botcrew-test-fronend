"use client"

import {useEffect, useReducer, useState} from "react";
import DepartmentContainer from "@/components/departmentContainer";
import {Department} from "@/components/model/model";
import {apiInstance} from "@/components/axiosInstance";



function reducer(state: Department[] , action: any) {
    const payload = action.payload;
    if (action.type === 'init') {
        return payload;
    }
    if (action.type === 'update') {
        if (state !== null) {
            const updatedDepartments = state.map(department => {
                if (payload.departmentIds.includes(department.id)) {
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
        apiInstance.get('/department/all')
            .then(res => {
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
            {departments  &&
                <div className="w-full flex">
                    <div className="flex flex-wrap gap-7 justify-center">
                        {
                            (departments as Department[]).map(item => {
                                return <DepartmentContainer
                                    key={item.id}
                                    department={item}
                                    updateDepartment={dispatch}
                                />;
                            })
                        }
                    </div>
                </div>
            }


        </>);
}