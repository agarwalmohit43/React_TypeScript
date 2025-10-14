interface TagInputProps {
  handleAddTag: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tagName?: string;
  setTagName: (value: string) => void;
}

const TagInput = ({
  handleAddTag,
  tagName,
  setTagName,
}: Readonly<TagInputProps>) => {
  return (
    <div>
      <h3>Enter TagName</h3>
      <input
        type="text"
        onChange={(e) => setTagName(e.target.value)}
        value={tagName}
      />
      <button onClick={handleAddTag} disabled={!tagName}>
        Add Tag
      </button>
    </div>
  );
};

export default TagInput;
