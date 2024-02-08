import {Department, Lector} from "@/components/model/model";
import {GrUpgrade} from "react-icons/gr";
import {lusitana} from "@/app/ui/fonts";
import {ChangeEvent, Dispatch} from "react";


export default function DepartmentContainer({department, updateDepartment}: {
    department: Department,
    updateDepartment: Dispatch<any>
}) {

    const updateName = (e: ChangeEvent<HTMLInputElement>, lectorId: number) => {

        const payload = {
            departmentId : department.id,
            lectorId: lectorId,
            value: e.target.value
        };


        return updateDepartment(
            {
                type: "update",
                payload
            }
        );
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
                            <input type="text"
                                   className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                                   value={lector.name}
                                   onChange={(e) => {
                                       updateName(e, lector.id)
                                   }}
                            >
                            </input>
                            <button className="bg-green-100 text-green-800 rounded-md  py-3 px-4 m-2"><GrUpgrade/>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>

    );
}