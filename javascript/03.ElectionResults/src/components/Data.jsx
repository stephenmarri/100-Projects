import React from 'react';


const Data = ({ data }) => {

    return (
        <div id='data_container' className=''>
            <table className="">
                <thead className='fc'>
                    <tr className='text-left'>
                        <th className=' ps-1 w-1/10'>#</th>
                        <th className=' ps-1 w-0155'>Const.</th>
                        <th className=' ps-1 w-2/6' >Elected</th>
                        <th className=' ps-1 w-2/6' >Party</th>
                    </tr>
                </thead>
                
                <tbody>
                {
                    data.map((constituency, index) => {
                        return <tr className='border-b border-t' key={`${index}`}>
                            <td style={{width: '8%'}} className='ps-1 '>{constituency.data_const_number}</td>
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
