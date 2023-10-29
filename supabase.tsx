import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://omzpuglcywbksxszffun.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tenB1Z2xjeXdia3N4c3pmZnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyMzcxMDIsImV4cCI6MjAwNjgxMzEwMn0.b4XqmINzYmg7YOIjGkolTiHrZCW3vX_t5JRdOhbvM8s';

export const supabase = createClient(supabaseUrl, supabaseKey);
