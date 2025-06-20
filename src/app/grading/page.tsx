export default function GradingPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">🏆 Freedom Service Grading Scale</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Freedom Gem – 10+</h2>
        <p>A flawless card. Perfect centering, sharp corners, pristine surface, and zero visible defects.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Mint Gem – 10</h2>
        <p>A near-perfect card with 1–2 extremely minor flaws, barely visible even under scrutiny.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Mint – 9</h2>
        <p>Minor flaws such as off-centering or slight edge/surface wear. Still a very clean card.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">NM-MT – 8</h2>
        <p>A card with 2–3 visible flaws: light corner touches, light scratches, or slightly more off-centered.</p>
      </div>
    </div>
  );
}