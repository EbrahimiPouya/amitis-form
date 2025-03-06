import * as React from "react";

interface IComponentProps{
    title : string;
    children : React.ReactNode;
    hasPrev?: boolean;
    hasNext?: boolean;
    prevLabel?: string;
    nextLabel?: string;
    onPrev?: ()=>void;
    onNext?: ()=>void;
}

const StepLayout = ({
                        title, children, hasPrev, hasNext, prevLabel, nextLabel, onPrev, onNext
                    }: IComponentProps) => (
    <div>
        <h2>{title}</h2>
        {children}
        <div>
            {hasPrev && <button onClick={onPrev}>{prevLabel}</button>}
            {hasNext && <button onClick={onNext}>{nextLabel}</button>}
        </div>
    </div>
);
export default StepLayout;
