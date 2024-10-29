import { ComponentProps } from 'react';
import { CheckCircle } from 'lucide-react';

export type ButtonProps = ComponentProps<'button'> & {
    sucess?: boolean
}

export function Button ({ sucess, ...props }: ButtonProps){
        return (
            <button
            data-sucess={sucess}
            className="h-10 rounded bg-zinc-50 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-200
             data-[sucess=true]:bg-emerald-500 data-[sucess=true]hover:bg-emerald-700"
            {...props}>
            {sucess ? <CheckCircle className="h-4 w-4" /> : props.children}
            </button>
        )
    }
