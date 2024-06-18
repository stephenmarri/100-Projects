import React from 'react'

const Body = ({data}) => {
    return (
        <div id='table'>
            <table>
                <thead className='fc'>
                    <tr>
                        <th style={{width:'10%'}} >#</th>
                        <th style={{width:'25%'}} >Cont.</th>
                        <th style={{width:'35%'}} >Elected</th>
                        <th style={{width:'30%'}} >Party</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data.map((consti, index) => {
                            return <tr key={index}>
                                <td style={{width:'10%'}} >{consti["data_const_number"]}</td>
                                <td style={{width:'25%'}} >{consti["data_constituency"]}</td>
                                <td style={{width:'35%'}} >{consti["data_leading_candidate"]}</td>
                                <td style={{width:'30%'}} >{consti["data_leading_party"]}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Body