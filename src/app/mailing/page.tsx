export default function MailingPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Mailing Instructions</h1>

      <p className="text-sm">
        Please ship your cards to the appropriate address based on your shipping method:
      </p>

      <div className="bg-gray-100 p-4 rounded border text-sm space-y-2">
        <p className="font-semibold">📦 USPS (Post Office Mail):</p>
        <p>Freedom Service Grading</p>
        <p>P.O. Box 460</p>
        <p>Circleville, OH 43113</p>

        <hr className="my-4" />

        <p className="font-semibold">🚚 FedEx, UPS, DHL, or other carriers:</p>
        <p>Freedom Service Grading</p>
        <p>244 S Court St.</p>
        <p>#460</p>
        <p>Circleville, OH 43113</p>
      </div>

      <h2 className="text-xl font-semibold mt-6">📬 Packaging Tips</h2>
      <ul className="list-disc list-inside text-sm space-y-2">
        <li>Use card savers or top loaders (no screw-downs or one-touches).</li>
        <li>Place cards between cardboard and secure them gently.</li>
        <li>Include your name, email, and order confirmation in the package.</li>
        <li>Add tracking and insurance if desired for peace of mind.</li>
      </ul>

      <p className="text-sm mt-6">
        You’ll receive an email when your cards arrive and again when grading is complete.
      </p>
    </main>
  );
}