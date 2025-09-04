-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true);

-- Create table for uploaded documents metadata
CREATE TABLE public.uploaded_documents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    file_type TEXT NOT NULL,
    file_size INTEGER,
    download_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on uploaded_documents table
ALTER TABLE public.uploaded_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for uploaded_documents (public access for demo purposes)
CREATE POLICY "Documents are viewable by everyone" 
ON public.uploaded_documents 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert documents" 
ON public.uploaded_documents 
FOR INSERT 
WITH CHECK (true);

-- Create storage policies for documents bucket
CREATE POLICY "Documents are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'documents');

CREATE POLICY "Anyone can upload documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Anyone can update documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'documents');