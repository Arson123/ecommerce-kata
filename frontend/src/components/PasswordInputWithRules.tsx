import { useState, useEffect } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onValidChange?: (isValid: boolean) => void;
}

export const PasswordInputWithRules: React.FC<Props> = ({
  value,
  onChange,
  onValidChange,
}) => {
  const [touched, setTouched] = useState(false);

  // reglas
  const hasLength = value.length >= 6;
  const hasNumber = /\d/.test(value);
  const hasSpecial = /[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]/.test(value);
  const isValid = hasLength && hasNumber && hasSpecial;

  useEffect(() => onValidChange?.(isValid), [isValid, onValidChange]);

  const icon = (ok: boolean) => (
    <span className={ok ? "text-green-600" : "text-red-600"}>
      {ok ? "✔️" : "❌"}
    </span>
  );

  return (
    <div>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="Contraseña"
        required
        className="w-full rounded border px-3 py-2"
      />

      {(touched || value) && (
        <ul className="mt-2 space-y-1 text-sm">
          <li>{icon(hasLength)} Mínimo 6 caracteres</li>
          <li>{icon(hasNumber)} Al menos 1 número</li>
          <li>{icon(hasSpecial)} Al menos 1 símbolo (! @ # …)</li>
        </ul>
      )}
    </div>
  );
};
