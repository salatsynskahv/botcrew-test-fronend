import {Department} from "@/components/model/model";


export default function DepartmentContainer({department}: {department: Department}) {
    return (<div>
        {department.title}
    </div>);
}