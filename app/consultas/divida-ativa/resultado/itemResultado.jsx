import { BadgeCheckIcon, ExclamationCircleIcon } from '@heroicons/react/solid';

const ItemResultado = (props) => {
    return (
        <div className={`flex w-fit items-center`}>
        {props.valor?
            <div className='p-1'>
                <span className={`font-bold leading-tight bg-slate-100 p-2 border-b`}>{props.campo}:</span>
                <span className={`p-2  border-b`}> {props.valor} </span>
            </div>
            :
            <></>
        }
        </div>
    )
}

export default ItemResultado