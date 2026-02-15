import React from "react";
import { StatCard } from "../../page";


export default function Stats({ stat }: { stat: StatCard }) {
    return (
        <div className="p-5 bg-primary/5 rounded-2xl border border-border/20 flex justify-between items-start">
            <div>
                <p className="text-body text-strong-black font-base mb-2">{stat.label}</p>
                <span className="text-display font-semibold text-text-strong leading-none">{stat.value}</span>
            </div>
            <div className="bg-brand-primary p-2.5 rounded-xl text-text-strong-white">
                {React.cloneElement(stat.icon as React.ReactElement)}
            </div>
        </div>
    )
}
