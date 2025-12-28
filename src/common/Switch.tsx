export default function Switch({
  label,
  name,
  onChange,
  checked,
}: {
  label: string;
  name: string;
  onChange: any;
  checked: boolean;
}) {
  return (
    <div className="switch-wrapper">
      <label className="switch">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <span className="slider round"></span>
      </label>
      <div className="group-label">{label}</div>
    </div> 
  );
}
