/**
 * Classe para erros.
 */
class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  /**
   * Construtor da classe.
   * @param message Mensagem de erro.
   * @param statusCode Código de erro. [400] é usado como padrão.
   */
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
