import React from 'react';


const Data = ({ data }) => {

    return (
        <div id='data_container' className=''>
            <table className="">
                <thead className=''>
                    <tr className='text-left'>
                        <th className='py-3 ps-1 w-1/10'>#</th>
                        <th className='py-3 ps-1 w-1.5/15'>Const.</th>
                        <th className='py-3 ps-1 w-2/5'>Elected</th>
                        <th className='py-3 ps-1 w-2/5'>Party</th>
                    </tr>
                </thead>
                
                <tbody>
                {
                    data.map((constituency, index) => {
                        return <tr className='border-b border-t' key={`${index}`}>
                            <td className='ps-1'>{constituency.data_const_number}</td>
                            <td className='ps-1'>{constituency.data_constituency}</td>
                            <td className='ps-1'>{constituency.data_leading_candidate}</td>
                            <td className='ps-1'>{constituency.data_leading_party}</td>
                        </tr>
                    })
                }
                </tbody>

            </table >
        </div >
    );
}

export default Data;
