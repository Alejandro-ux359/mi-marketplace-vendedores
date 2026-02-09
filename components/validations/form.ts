// components/form.ts

/**
 * Maneja cambios en los campos de nombre y apellido
 * Solo permite letras y espacios entre palabras
 * Elimina espacios al inicio o final y múltiples espacios
 */
export const handleNameChange = (
  value: string,
  setter: (val: string) => void,
) => {
  const sanitized = value
    // Solo letras y espacios
    .replace(/[^a-zA-ZÀ-ÿ\s]/g, "")
    // Evita múltiples espacios seguidos
    .replace(/\s{2,}/g, " ");

  setter(sanitized);
};

/**
 * Maneja cambios en el campo correo
 * Solo permite letras, números y signos válidos (@ . _ -)
 */
export const handleEmailChange = (
  value: string,
  setter: (val: string) => void,
) => {
  const sanitized = value.replace(/[^a-zA-Z0-9@._-]/g, "");
  setter(sanitized);
};

/**
 * Valida que el correo tenga un formato correcto
 */
export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Maneja cambios en el campo de contraseña
 * Elimina caracteres peligrosos comunes en ataques de inyección
 */
export const handlePasswordChange = (
  value: string,
  setter: (val: string) => void,
) => {
  const sanitized = value.replace(/['";<>]/g, "");
  setter(sanitized);
};

/**
 * Valida contraseña mínima de 6 caracteres (puedes ajustar)
 */
export const validatePassword = (password: string) => {
  return password.length >= 6;
};
