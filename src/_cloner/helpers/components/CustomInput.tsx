import clsx from "clsx";

const CustomInput = (props: any) => {
    return (
        <div className="fv-row">
            <input
                placeholder={props.title}
                className={clsx("form-control bg-transparent !h-[36px]")}
                type={props.type}
                ref={props.ref}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
                defaultValue={props.defaultValue}
                autoComplete="off"
            />
        </div>
    );
};

export default CustomInput;
