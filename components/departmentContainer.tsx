import {Department, Lector} from "@/components/model/model";
import {GrUpgrade} from "react-icons/gr";
import {lusitana} from "@/app/ui/fonts";
import {ChangeEvent, Dispatch} from "react";
import LectorNameInput from "@/components/lectorNameInput";
import clsx from "clsx";
import {config} from "@/components/Constants";
import {apiInstance} from "@/components/axiosInstance";


export default function DepartmentContainer({department, updateDepartment}: {
    department: Department,
    updateDepartment: Dispatch<any>
}) {

    const updateDegree = (lector: Lector) => {
        console.log(lector);
        apiInstance.put(`lector/${lector.id}/promote`)
            .then(
                res => {
                    const updatedLector: Lector = res.data
                    if (updatedLector.degreeId > 0 && lector.degreeId > 0 && updatedLector.degreeId !== lector.degreeId) {
                        const payload = {
                            departmentIds: updatedLector.departmentIds,
                            lectorId: updatedLector.id,
                            degree: updatedLector.degree,
                            degreeId: updatedLector.degreeId
                        }
                        updateDepartment({
                            type: "upgrade",
                            payload
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div
            className="w-[350px] block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h5
                className={`${lusitana.className}  mb-6 text-2xl font-medium leading-tight text-neutral-800 dark:text-neutral-50`}>
                {department.title}
            </h5>
            <div
                className="my-4 flex flex-col align-middle justify-center gap-2 text-base text-neutral-600 dark:text-neutral-200 ">
                {
                    department.lectors.map(lector =>
                        <div key={lector.id} className="flex justify-between">
                            <LectorNameInput lector={lector} updateDepartment={updateDepartment}/>
                            <button
                                className={clsx(
                                    "rounded-md  py-3 px-4 m-2",
                                    lector.degreeId < config.maxDegreeCount && "bg-green-100 text-green-800",
                                    lector.degreeId >= config.maxDegreeCount && "bg-gray-100 text-gray-600 disabled"
                                )}
                                onClick={() => updateDegree(lector)}
                            >
                                <GrUpgrade/>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>

    );
}