import { BadgeCheckIcon, ExclamationCircleIcon } from '@heroicons/react/solid';

const ItemResultado = (props) => {
    return (
        <div className="flex w-fit items-center">
            <span className='font-bold leading-tight'>{props.campo}:</span>
            <span className='p-2 leading-none'> {props.valor} </span>
            <span className='leading-none'>{
                props.ok ?
                    <BadgeCheckIcon className="h-5 w-5 text-green-500" />
                    :
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            }</span>
            {props.similaridade && <span className='p-2 italic text-xs'>{(props.similaridade * 100).toFixed(0)}%</span>}
        </div>
    )
}

export default ItemResultado