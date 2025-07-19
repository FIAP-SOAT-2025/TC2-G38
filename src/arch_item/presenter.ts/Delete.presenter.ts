export class DeletePresenter {
  static toResponse(id: string | undefined ): { message: string } {
   
    return {
        message: id && id.trim() !== ''
        ? `Item with ID ${id} deleted successfully`
        : `Item with ID ${id} deletion failed`,
    };
  }
}