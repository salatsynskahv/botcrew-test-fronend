import {Lector} from "@/components/model/model";
import {ChangeEvent, Dispatch, useEffect, useState} from "react";
import {useDebounce} from "@/components/useDebouce";
import axios from "axios";
import {apiInstance} from "@/components/axiosInstance";


export default function LectorNameInput({lector, updateDepartment}: {lector: Lector, updateDepartment: Dispatch<any>}) {

    const updateName = (e: ChangeEvent<HTMLInputElement>, lectorId: number, lectorDepartments: number[]) => {

        const payload = {
            departmentIds: lectorDepartments,
            lectorId: lectorId,
            fieldName: "name",
            name: e.target.value
        };


        return updateDepartment(
            {
                type: "update",
                payload
            }
        );
    }

    const [lectorName, setLectorName] = useState<string>();
    const debouncedValue = useDebounce(lectorName);

    const params = { name: debouncedValue };
    useEffect(() => {
        if(debouncedValue) {
        apiInstance.put(`lector/${lector.id}/update`, null, {params})
            .then((res) => {
                console.log("Name was updated");
            })
        }
    }, [debouncedValue]);

    return (
        <input type="text"
               className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
               value={lector.name}
               onChange={(e) => {
                   setLectorName(e.target.value);
                   updateName(e, lector.id, lector.departments.map(dep => dep.id));
               }}
        />
    )
}