import React from 'react';


const Data = ({ data }) => {

    return (
        <div id='data_container' className=''>
            <table className="">
                <thead className=''>
                    <tr className='text-left'>
                        <th className='py-3 ps-1 w-1/10'>#</th>
                        <th className='py-3 ps-1 w-0155'>Const.</th>
                        <th className='py-3 ps-1 w-2/6' >Elected</th>
                        <th className='py-3 ps-1 w-2/6' >Party</th>
                    </tr>
                </thead>
                
                <tbody>
                {
                    data.map((constituency, index) => {
                        return <tr className='border-b border-t' key={`${index}`}>
                            <td Style={"width: 10%"} className='ps-1 '>{constituency.data_const_number}</td>
                            <td Style={"width: 24%"} className='ps-1 '>{constituency.data_constituency}</td>
                            <td Style={"width: 34%"} className='ps-1 '>{constituency.data_leading_candidate}</td>
                            <td Style={"width: 32%"} className='ps-1 '>{constituency.data_leading_party}</td>
                        </tr>
                    })
                }
                </tbody>

            </table >
        </div >
    );
}

export default Data;
