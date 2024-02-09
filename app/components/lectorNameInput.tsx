import {Lector} from "@/app/model/model";
import {ChangeEvent, Dispatch, useEffect, useState} from "react";
import {useDebounce} from "@/app/hooks/useDebouce";
import {apiInstance} from "@/app/api/axiosInstance";
import {InputMask, useMask} from "@react-input/mask";

const degreeIdtoTitle = new Map();
degreeIdtoTitle.set(1, "Dr.");
degreeIdtoTitle.set(2, "Dr.");
degreeIdtoTitle.set(3, "Prof");

export default function LectorNameInput({lector, updateDepartment}: {
    lector: Lector,
    updateDepartment: Dispatch<any>
}) {

    const updateName = (e: ChangeEvent<HTMLInputElement>, lectorId: number, lectorDepartments: number[]) => {

        const payload = {
            departmentIds: lectorDepartments,
            lectorId: lectorId,
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

    const params = {name: debouncedValue};
    useEffect(() => {
        if (debouncedValue) {
            apiInstance.put(`lector/${lector.id}/update`, null, {params})
                .then((res) => {

                })
        }
    }, [debouncedValue]);

    const inputRef = useMask({mask: 'DR. _', replacement: {_: /\w/}});

    function defineTitle(lector: Lector): string{
        return degreeIdtoTitle.get(lector.degreeId);
    }

    return (
        <span className="p-float-label flex">
            <input id="ssn_input"
                       value={lector.name}
                       className="border border-gray-300 rounded-md pl-6 focus:outline-none focus:border-blue-500"
                       onChange={(e) => {
                           setLectorName(e.target.value);
                           updateName(e, lector.id, lector.departmentIds);
                       }}
            />
            <label htmlFor="ssn_input">
                {defineTitle(lector)}
            </label>
        </span>
    )
}