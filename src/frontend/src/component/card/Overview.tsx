import { FC } from "react";
import { ClassQuery } from "../../api/store/class/interface";
import { Link } from "react-router-dom";


const Overview: FC = () => {

return(
    <div className="h-full w-full flex justify-center bg-slate-50 pt-6">
    <div className="max-w-max">
        <img className="rounded-t-lg mb-5" src="https://gstatic.com/classroom/themes/img_reachout.jpg" alt="Header" />
        <div className="flex flex-row">   
            <a className="flex h-40 gap-3  p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  flex-shrink-0">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <p className="mb-2 font-bold pt-2  tracking-tight text-gray-900 dark:text-white pb-4">Class code: </p>
                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </div>
                        <p className="font-normal flex-end  text-gray-700 dark:text-gray-400 block">ABCD-5454E-343
                    
                    </p>
                </div>
            </a>
            <div className="flex w-full justify-between">
            <div className="p-6 w-full ml-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
           
            <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
                See our guideline
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                </svg>
            </a>
            </div>


            </div>
        </div>
    </div>
</div>
)

}
export default Overview;