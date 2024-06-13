import React from 'react';


const Data = ({data}) => {

    return (
        <div id='data_container' className=''>
            <table className="">
                <thead className=''>
                    <tr className='text-left'>
                        <th className='p-3'>#</th>
                        <th className='p-3'>Const.</th>
                        <th className='p-3'>Elected</th>
                        <th className='p-3'>Party</th>
                    </tr>
                </thead>
     
                <tbody> 

                        {data.map((stateData, stateIndex) => (
                            Object.entries(stateData).map(([state, constituencies]) => (
                                constituencies.map((constituency, index) => (
                                    <tr className='border-b border-t' key={`${stateIndex}-${index}`}>
                                        <td className='pe-3 ps-1'>{constituency.data_const_number}</td>
                                        <td className=''>{constituency.data_constituency}</td>
                                        <td className=''>{constituency.data_leading_candidate}</td>
                                        <td className=''>{constituency.data_leading_party}</td>
                                    </tr>
                                ))
                            ))
                        ))}
                </tbody> 
      
            </table >
        </div >
    );
}

export default Data;
