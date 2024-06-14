import React from 'react';


const Data = ({ data }) => {

    return (
        <div id='data_container' className=''>
            <table className="">
                <thead className='fc'>
                    <tr className='text-left'>
                        <th style={{width: '8%'}}   className=' ps-1'>#</th>
                        <th style={{width: '26%'}}  className=' ps-1'>Const.</th>
                        <th style={{width: '33%'}}  className=' ps-1'>Elected</th>
                        <th style={{width: '33%'}}  className=' ps-1'>Party</th>
                    </tr>
                </thead>
                
                <tbody>
                {
                    data.map((constituency, index) => {
                        return <tr className='border-b border-t' key={`${index}`}>
                            <td style={{width: '8%'}}  className='ps-1 '>{constituency.data_const_number}</td>
                            <td style={{width: '26%'}} className='ps-1 '>{constituency.data_constituency}</td>
                            <td style={{width: '33%'}} className='ps-1 '>{constituency.data_leading_candidate}</td>
                            <td style={{width: '33%'}} className='ps-1 '>{constituency.data_leading_party}</td>
                        </tr>
                    })
                }
                </tbody>

            </table >
        </div >
    );
}

export default Data;
