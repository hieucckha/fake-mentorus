import { FC } from "react";
import { classDetailQuery } from "../../api/store/class/queries";
import {  useParams } from "react-router-dom";
import moment from "moment";


const Overview: FC = () => {

   const { id } = useParams();

    const {data, isLoading} = classDetailQuery(id as string );
    if (!data) return null;
    const copylink = () => {
        navigator.clipboard.writeText(data?.inviteLink);
    }
    const copyCode = () => {
        navigator.clipboard.writeText(data?.inviteCode);
    }
    return(
        isLoading ? <div>Loading...</div> :
         <div className="h-full w-full flex justify-center bg-slate-50 pt-6">
        <div className="max-w-max">
            <img className="rounded-t-lg mb-5" src="https://gstatic.com/classroom/themes/img_reachout.jpg" alt="Header" />
            <div className="flex flex-row">
                <a className="flex h-40 gap-3  p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  flex-shrink-0">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between">
                            <p className="mb-2 font-bold pt-2  tracking-tight text-gray-900 dark:text-white pb-4">Class code: </p>
                            <svg onClick={copyCode} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </div>
                        <p className="font-normal flex-end  text-gray-700 dark:text-gray-400 block">{data?.inviteCode}</p>
                            <div className="flex flex-row mt-3 justify-between">
                            <p className="mb-2 font-bold pt-2  tracking-tight text-gray-900 dark:text-white pb-4">Invite: </p>
                            <svg onClick={copylink} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer hover:to-blue-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </div>

                    </div>
                </a>
                <div className="flex w-full flex-row justify-between">
                    <div className="flex-row w-full ">
                        <div className="p-6 w-full ml-6 bg-white border mb-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{data?.name}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{data?.description}</p>
                        </div>

                        { data.requests && data.requests.map((request) => (
                            <div className="p-4 w-full ml-6 bg-white border mb-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#" className="flex  items-center   flex-row  ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">{request.studentName} has request: {request.reason} </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {moment(request.createdAt).format('DD/MM/YYYY')}
                                    </p>
                                </div>
                                </a>


                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}
export default Overview;
