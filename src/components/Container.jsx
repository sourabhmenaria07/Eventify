function Container({ children }) {
 return (
    <div className="flex-grow w-full max-w-6xl mx-auto px-4 py-12">
      {children}
    </div>
  );
}

export default Container;
