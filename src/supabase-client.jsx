import { createClient } from "@supabase/supabase-js";
// import { meta } from "eslint-plugin-react-hooks";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY


const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase