type Props = {
    genre: string;
    setGenre: (genre: string) => void;
}
export default function SelectGenre({ genre, setGenre }: Props) {
    return (
        <div className="mb-3">
            <label htmlFor="SelectionGenre" className="form-label">Selection genre :</label>
            <select className="form-select" aria-label="Selection genre" required value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">Sélectionner un genre</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
            </select>
        </div>
    )
}