import React, { useEffect, useState } from 'react'

// import { createAction } from '../../redux/actions/caseAction';
import { useSelector, useDispatch } from 'react-redux';
// import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import i18n from "../translation";
import { useTranslation } from "react-i18next";


const Timeline = ({action}) => {
  const { t } = useTranslation();
  const itemsPerPage = 5; // Number of items to show initially
  const [currentPage, setCurrentPage] = useState(1);
  const [slicedData, setSlicedData] = useState(action.slice(0, itemsPerPage));

  useEffect(() => {
    setSlicedData(action.slice(0, itemsPerPage))
    }, [action]);

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const newSlicedData = action.slice(startIndex, startIndex + itemsPerPage);

    setCurrentPage(nextPage);
    setSlicedData(slicedData.concat(newSlicedData)); // Efficiently append new data
  };

  const isMoreAvailable = action.length > currentPage * itemsPerPage;

    const covertdate = (date) => {
        const options = {
        //   weekday: 'long',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        //   hour: '2-digit',
        //   minute: '2-digit',
        //   second: '2-digit',
        };
      
        // Parse the timestamp string into a Date object
        const date1 = new Date(date);
      
        // Use toLocaleDateString() on the Date object
        return date1.toLocaleDateString('en-US', options);
      };

    const statusMapping = {
        "Received": t("Received"),
        "Under Review": t("Under Review"),
        "Assigned": t("Assigned"),
        "Investigation In Progress": t("Investigation In Progress"),
        "Report Approved": t("Report Approved"),
        "Canceled": t("Canceled"),
        "Process Completed": t("Process Completed"),
        "Closed": t("Closed"),
        "Resolved": t("Resolved")
    };


    return (
        <div>
            {slicedData?.map((data) => (
            <div className="flex gap-x-3">

                {data.status &&<div className="w-28 text-end">
                    <span className="text-base text-gray-500 dark:text-gray-400">{covertdate(data.created_at)}</span>
                </div>}

                {data.status && <div className="min-h-5 relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
                    <div className="relative z-10 size-7 flex justify-center items-center">
                        <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                    </div>
                </div>}

                <table size="table-auto">
                <tbody className='float-start mb-4 mt-1'>
                    {/* {data.category && <tr className=' '>
                        <td className="mt-1  pr-2 text-sm text-gray-600 dark:text-gray-400">Category</td>
                        <td className="text-left font-semibold text-gray-800 dark:text-white">
                            {data.category}
                        </td>
                    </tr>} */}
                    {data.status &&<tr className=''>
                        <td className="mt-1 pr-2  text-sm text-gray-600 dark:text-gray-400">{t("Status")}</td>
                        <td className="text-left font-semibold">
                           {/* {data.status == "Received" ? t("Received") :   data.status} */}
                           {/* {data.status == "Received" ? t("Received") : 
                            data.status == "Under Review" ? t("Under Review") :
                            data.status == "Assigned" ? t("Assigned") :
                            data.status == "Investigation In Progress" ? t("Investigation In Progress") :
                            data.status == "Report Approved" ? t("Report Approved") :
                            data.status == "Canceled" ? t("Canceled") : 
                            data.status == "Process Completed" ? t("Process Completed") :
                            data.status == "Closed" ? t("Closed") :
                            data.status == "Resolved" ? t("Resolved") : data.status} */}
                            {statusMapping[data.status] || data.status}
                        </td>
                    </tr>}
                    
                    {/* {data.priority && <tr className=''>
                        <td className="mt-1 pr-2  text-sm text-gray-600 dark:text-gray-400">Priority</td>
                        <td className="font-semibold text-gray-800 dark:text-white">
                            {data.priority}
                        </td>
                    </tr>} */}
                   
                    {/* {data.assign_to && <tr className=''>
                        <td className="mt-1 pr-2  text-sm text-gray-600 dark:text-gray-400">assigned_to</td>
                        <td className="font-semibold text-gray-800 dark:text-white">
                            {data.assign_to.full_name}
                        </td>
                    </tr>} */}

                    {/* {data.remark && <tr className=''>
                        <td className="mt-1 pr-2 text-sm text-gray-600 dark:text-gray-400">Remark :</td>
                        <td className="mt-1 text-left max-w-72 text-sm text-gray-800 dark:text-white">
                        {data.remark}
                        </td>
                    </tr>} */}

                    {/* {data.editor && <tr className=''>
                        <td className="mt-1 text-left max-w-72 text-sm text-gray-800 dark:text-white">
                           writes in editor
                        </td>
                    </tr>} */}

                    {/* {data.attachments.length > 0 && <tr className=''>
                        <td className="mt-1 text-left max-w-72 text-sm text-gray-800 dark:text-white">
                          attached {data.attachments.length}  file
                        </td>
                    </tr>} */}
                </tbody>
                </table>

                </div>))}
        
        </div>
    )
}

export default Timeline