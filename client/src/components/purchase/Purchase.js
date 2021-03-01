import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Purchase.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPurchase } from '../../redux/action/purchaseAction'

const Purchase = () => {

    let purchase = useSelector(state => state.purchase)
    const dispatch = useDispatch()

    useEffect( async () => {

        await dispatch(getPurchase());
        
    }, [])

    return (
        <div className="container mt-3 p-3 bg-white">
            <header className="header-purchase-page">
                <Link to="/purchase" activeClassName="purchase-item-active" className="purchase-item">
                    ประวัติการซื้อ   
                </Link>
                <Link to="/reward" className="purchase-item">
                    การรับรางวัล
                </Link>
            </header>
            <div className="history-user-buy">
                {JSON.stringify(purchase,null,2)}
                <div className="card">
                    <div className="card-header">วันที่ซื้อ</div>
                    <div className="card-body">สลาก</div>
                </div>
            </div>
        </div>
    )
}

export default Purchase

