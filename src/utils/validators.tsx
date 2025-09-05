// Formatações
export const formatCpfCnpj = (value: string, tipo: "CPF" | "CNPJ") => {
  const numbers = value.replace(/\D/g, "");
  if (tipo === "CPF") {
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else {
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
};

export const formatTelefone = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

// Validação CPF
export const validarCPF = (cpf: string) => {
  const numbers = cpf.replace(/\D/g, "");
  if (numbers.length !== 11) return false;
  if (/^(\d)\1+$/.test(numbers)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(numbers[i]) * (10 - i);
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(numbers[i]) * (11 - i);
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;

  return digit1 === parseInt(numbers[9]) && digit2 === parseInt(numbers[10]);
};

// Validação CNPJ
export const validarCNPJ = (cnpj: string) => {
  const numbers = cnpj.replace(/\D/g, "");
  if (numbers.length !== 14) return false;
  if (/^(\d)\1+$/.test(numbers)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseInt(numbers[i]) * weights1[i];
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;

  sum = 0;
  for (let i = 0; i < 13; i++) sum += parseInt(numbers[i]) * weights2[i];
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;

  return digit1 === parseInt(numbers[12]) && digit2 === parseInt(numbers[13]);
};
