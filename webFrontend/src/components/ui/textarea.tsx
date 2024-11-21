type TextareaProps = {
   placeholder: string;
   rows: number;
   value?: string;
};

export const Textarea = ({ placeholder, rows, value }: TextareaProps) => {
   return (
      <div className="has-[:focus]:border-white flex items-center rounded-3xl border-2 border-gray-700">
         <textarea
            className="flex-1 outline-none bg-transparent h-full p-5 resize-none"
            placeholder={placeholder}
            rows={rows}
            value={value}
         ></textarea>
      </div>
   );
};
