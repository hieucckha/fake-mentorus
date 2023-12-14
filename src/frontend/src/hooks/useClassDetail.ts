import { useParams } from "react-router-dom";
import { classDetailQuery } from "../api/store/class/queries";

export default function useClassDetail()  {
    const { id } = useParams();
    if (!id) {
        throw new Error("id is required");
    }

    return classDetailQuery(id);
}


