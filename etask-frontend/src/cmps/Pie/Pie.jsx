import './Pie.scss';
export const Pie = ({done, total}) => {
    const precentage = Math.round((100 * done) / total) || 0;
    const deg = Math.round((precentage * 360) / 100);
    return (
        <div className="pie"
            style={{
                background: `conic-gradient( #3772ff ${deg}deg, #717171 ${deg + 1}deg)`
            }}>
            <h4>{precentage}</h4><span>%</span>
        </div>
    )
}

