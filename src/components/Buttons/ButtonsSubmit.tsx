type PropsStateButton = {
  state: boolean; // true — форма валидна
};

export default function ButtonsSubmit({ state }: PropsStateButton) {
  return (
    <button
      type="submit"
      className="btn btn-primary mt-3 mb-3"
      disabled={!state}
    >
      Submit
    </button>
  );
}
