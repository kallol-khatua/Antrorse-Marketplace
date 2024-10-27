import DocumentUploadForm from "./Form";

function UploadDocument() {
  return (
    <div>
      <h2 className=" text-2xl shadow-sm font-bold text-center border-b mb-2 pb-4">
        Upload document
      </h2>
      <DocumentUploadForm />
    </div>
  );
}

export default UploadDocument;
