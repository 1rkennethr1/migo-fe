export default function ContactUsItem({e}){
    return(
        <div className="flex flex-row gap-5 items-center">
            {e.icon}
            <div className="flex flex-col">
                <p className="font-bold">{e.title}</p>
                <p>{e.detail}</p>
            </div>
        </div>
    )
}