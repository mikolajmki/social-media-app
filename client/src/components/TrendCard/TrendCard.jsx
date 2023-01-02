import React from "react";
import './TrendCard.css';
import { TrendsData } from '../../Data/TrendsData';

const TrendCard = () => {
    return (
        <div className="trend-card">
            <h3>Trends for you</h3>
            {TrendsData.map((trend) => {
                return (
                    <div key={ trend.name }>
                        <span>#{trend.name} </span>
                        <span>{trend.shares}k shares</span>
                    </div>
                    )
                })}
        </div>
    )
}

export default TrendCard;