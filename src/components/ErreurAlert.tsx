type Props = {
    message: string;
}
export default function ErreurAlert({ message }: Props) {
    return (
        <div className="w-50 mt-5 alert alert-danger text-center container">
            {message}
        </div>
    )
}