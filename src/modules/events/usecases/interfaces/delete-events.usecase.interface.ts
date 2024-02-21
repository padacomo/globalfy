export interface IDeleteEventsUseCase {
  execute(id: string): Promise<void>;
}

export const IDeleteEventsUseCaseName = 'IDeleteEventsUseCase';
