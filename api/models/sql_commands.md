// Edit headers to match defined ones
// NOTE: DELETE COLUMNS IN GOOGLE SHEETS WHICH ARE EMPTY/NOT USED
// Also, potentially add 'createdat date' column

CREATE TABLE jobs(job_id bigint,client text,project text,client_ref text,job_status text,order_type text,updatedat date,shipping_date date,shipping_notes text,parts_status text,parts_notes text,invoice_notes text,payment text,notes text);

ALTER TABLE jobs ADD PRIMARY KEY (job_id);
ALTER TABLE jobs ALTER COLUMN job_id SET NOT NULL;

COPY jobs FROM '~/Downloads/rnb/jobs.csv' CSV HEADER;
SELECT MAX(job_id) FROM jobs;

CREATE SEQUENCE jobs_job_id_seq
	INCREMENT 1
	MINVALUE 4000
	MAXVALUE 9223372036854775807
	START 4000
	CACHE 1;

ALTER TABLE jobs ALTER COLUMN job_id SET DEFAULT nextval('jobs_job_id_seq'::regclass);
ALTER TABLE jobs ADD COLUMN createdat DATE ;


-------------------------

CREATE TABLE job_items(job_id int,product text,description text,glass text,metal text,flex text,bulb text,qty_req int,qty_hot int,qty_cold int,qty_assem int,notes text);

ALTER TABLE job_items
	ADD CONSTRAINT job_items_job_id_fkey FOREIGN KEY (job_id)
			REFERENCES jobs (job_id) MATCH SIMPLE
			ON UPDATE NO ACTION ON DELETE NO ACTION;


COPY jobs FROM '~/Downloads/rnb/job_items.csv' CSV HEADER;

CREATE SEQUENCE job_items_item_id_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;

ALTER TABLE job_items ADD COLUMN item_id BIGINT UNIQUE DEFAULT nextval('job_items_item_id_seq'::regclass);
ALTER TABLE job_items ADD PRIMARY KEY (item_id);

-------------------------

CREATE TABLE products(SKU text,type text,name text,description text,active boolean,saleable boolean);
COPY products FROM '~/Downloads/rnb/products.csv' CSV HEADER;

CREATE SEQUENCE products_id_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;

ALTER TABLE products ADD COLUMN id BIGINT UNIQUE DEFAULT nextval('products_id_seq'::regclass);
ALTER TABLE products ADD PRIMARY KEY (id);

-----------------------

CREATE TABLE selections(type text,label text,rank int,active boolean,default_selected boolean);
COPY selections FROM '~/Downloads/rnb/selections.csv' CSV HEADER;

CREATE SEQUENCE selections_id_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;

ALTER TABLE selections ADD COLUMN id BIGINT UNIQUE DEFAULT nextval('selections_id_seq'::regclass);
ALTER TABLE selections ADD PRIMARY KEY (id);

------------------------

CREATE TABLE contacts(type text,name text,active boolean);
COPY contacts FROM '~/Downloads/rnb/contacts.csv' CSV HEADER;

CREATE SEQUENCE contacts_id_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;

ALTER TABLE contacts ADD COLUMN id BIGINT UNIQUE DEFAULT nextval('contacts_id_seq'::regclass);
ALTER TABLE contacts ADD PRIMARY KEY (id);

-------------------------

<!-- CREATE TABLE contacts(type text,name text,active boolean);
COPY contacts FROM '~/Downloads/rnb/contacts.csv' CSV HEADER;

CREATE SEQUENCE contacts_id_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;

ALTER TABLE contacts ADD COLUMN id BIGINT UNIQUE DEFAULT nextval('contacts_id_seq'::regclass);
ALTER TABLE contacts ADD PRIMARY KEY (id); -->

-------------------------

CREATE TABLE selections(type text, label text);

INSERT INTO selections (type, label) VALUES ('job_status', 'TBC'), ('job_status', 'Non-Starter'), ('job_status', 'Confirmed'), ('job_status', 'Packaged'), ('job_status', 'Done'), ('order_type', 'Standard'), ('order_type', 'Bespoke'), ('order_type', 'RB Parts'), ('order_type', 'Outsourced'), ('order_type', 'Loan or Press'), ('parts_status', ' '),('parts_status', 'Started'), ('parts_status', 'Done'), ('product_type', ' '), ('product_type', 'Pendant'), ('product_type', 'Glass Colour & Style'), ('product_type', 'Metal Finish'), ('product_type', 'Flex'), ('product_type', 'Bulb'), ('product_type', 'Ceiling Plate'), ('payment', 'Awaiting Payment'), ('payment', 'Deposit'), ('payment', 'Paid Card'), ('payment', 'Paid BACS'), ('payment', 'Paid Other'), ('payment', 'Non-Starter'), ('contact_type', 'Customer'), ('contact_type', 'Supplier');



CREATE TABLE job_items(item_id int, job_id int references jobs(job_id), product text, description text, glass text, metal text, flex text, bubl text, qty_req int, qty_hot int, qty_cold int, qty_assem int, qty_packed int, notes text, updatedat date, createdat date);



create table products(id serial, type text, name text, description text, active boolean, saleable boolean);


insert into products(type, name, description, active, saleable) values ('Pendant', 'Black Nouveau Bell', '- http://www.rothschildbickers.com/products/black-nouveau/\n- Black glass only\n- Height: 270mm\n- Diameter: 180mm \n- £310.00 RRP', true, true), ('Pendant', 'Black Nouveau Open', '- http://www.rothschildbickers.com/products/black-nouveau/\n- Black glass only\n- Height: 185mm\n- Diameter: 320mm \n- £310.00 RRP', true, true),('Pendant', 'Bubble Light', '- http://www.rothschildbickers.com/products/bubble/\n- Height: 240mm\n- Diameter: 270mm\n- £420.00 RRP', true, true), ('Pendant', 'Empire Short', '- http://www.rothschildbickers.com/products/empire/\n- Height: 210mm\n- Diameter: 150mm\n- £340.00 RRP', true, true), ('Pendant', 'Empire Tall', '- http://www.rothschildbickers.com/products/empire/\n- Height: 420mm\n- Diameter: 120mm\n- £380.00 RRP', true, true), ('Pendant', 'Flora Pendant Large', '- http://www.rothschildbickers.com/products/flora/\n- Height: 260mm\n- Diameter: 220mm\n- £380.00 RRP', true, true), ('Pendant', 'Flora Pendant Small', '- http://www.rothschildbickers.com/products/flora/\n- Height: 220mm\n- Diameter: 180mm\n- £320.00 RRP', true, true), ('Pendant', 'Heal''s Tassel', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Heal''s Vintage', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Lantern Light', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Open Optic', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Opulent Optic', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Opulent Optic w/ burgundy fringe', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Opulent Optic w/ gold fringe', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Opulent Optic w/ grey fringe', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Pick-n-Mix Ball', '- http://www.rothschildbickers.com/products/pick-n-mix/\n- Height: 215mm\n- Diameter: 195mm\n- £295.00 RRP', true, true), ('Pendant', 'Pick-n-Mix Bowl', '- http://www.rothschildbickers.com/products/pick-n-mix/\n- Height: 190mm\n- Diameter: 190mm\n- £295.00 RRP', true, true), ('Pendant', 'Pick-n-Mix Cylinder', '- http://www.rothschildbickers.com/products/pick-n-mix/\n- Height: 240mm\n- Diameter: 110mm\n- £295.00 RRP', true, true), ('Pendant', 'Pick-n-Mix Large Ball', '- http://www.rothschildbickers.com/products/pick-n-mix/\n- Height: 280mm\n- Diameter: 250mm\n- £495.00 RRP', true, true), ('Pendant', 'Pick-n-Mix Large Bowl', '- http://www.rothschildbickers.com/products/pick-n-mix/\n- Height: 265mm\n- Diameter: 245mm\n- £495.00 RRP', true, true), ('Pendant', 'Pick-n-Mix Large Cylinder', '- http://www.rothschildbickers.com/products/pick-n-mix/\n- Height: 325mm\n- Diameter: 135mm\n- £495.00 RRP', true, true), ('Pendant', 'Pick-n-Mix Large Pot', '- http://www.rothschildbickers.com/products/pick-n-mix/\n- Height: 305mm\n- Diameter: 180mm\n- £495.00 RRP', true, true), ('Pendant', 'Pick-n-Mix Pot', '- http://www.rothschildbickers.com/products/pick-n-mix/\n- Height: 230mm\n- Diameter: 150mm\n- £295.00 RRP', true, true), ('Pendant', 'Retro Light', '- \n- Height: \n- Diameter: \n- £ RRP', true, true),('Pendant', 'Spindle Pendant 3-Bubble', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Spindle Pendant 4-Bubble', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Spindle Shade', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Standing Pendant', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Tassel Light', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Tiered Light', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Pendant', 'Vintage Light', '- \n- Height: \n- Diameter: \n- £ RRP', true, true), ('Ceiling Plate', '1-drop Standard Lilleys', '', true, true), ('Ceiling Plate', '1-Drop Empire', '', true, true), ('Ceiling Plate', '3-Drop D265mm', '', true, true), ('Ceiling Plate', '4-Drop D265mm', '', true, true), ('Ceiling Plate', 'Bespoke multi-drop', '', true, true), ('Flex', 'B&W Herringbone ~ 3-Core Round', '', true, true), ('Flex', 'B&W Herringbone ~ 3-Core Twisted', '', true, true), ('Flex', 'Black ~ 3-Core Round', '', true, true), ('Flex', 'Black ~ 3-Core Twisted', '', true, true), ('Flex', 'Bright Blue ~ 3-Core Round', '', true, true), ('Flex', 'Bright Blue ~ 3-Core Twisted', '', true, true), ('Flex', 'Brown ~ 3-Core Round', '', true, true), ('Flex', 'Brown ~ 3-Core Twisted', '', true, true), ('Flex', 'Burgundy ~ 3-Core Round', '', true, true), ('Flex', 'Burgundy ~ 3-Core Twisted', '', true, true), ('Flex', 'Copper Metal Braid ~ 3-Core Round', '', true, true), ('Flex', 'Elephant Grey ~ 3-Core Round', '', true, true), ('Flex', 'Elephant Grey ~ 3-Core Twisted', '', true, true), ('Flex', 'Fuschia ~ 3-Core Round', '', true, true), ('Flex', 'Fuschia ~ 3-Core Twisted', '', true, true), ('Flex', 'Havana Gold ~ 3-Core Round', '', true, true), ('Flex', 'Havana Gold ~ 3-Core Twisted', '', true, true), ('Flex', 'Khaki ~ 3-Core Round', '', true, true), ('Flex', 'Khaki ~ 3-Core Twisted', '', true, true), ('Flex', 'Light Grey ~ 3-Core Round', '', true, true), ('Flex', 'Light Grey ~ 3-Core Twisted', '', true, true), ('Flex', 'Light Purple ~ 3-Core Round', '', true, true), ('Flex', 'Light Purple ~ 3-Core Twisted', '', true, true), ('Flex', 'Navy Blue ~ 3-Core Round', '', true, true), ('Flex', 'Navy Blue ~ 3-Core Twisted', '', true, true), ('Flex', 'Neon Green ~ 3-Core Round', '', true, true), ('Flex', 'Neon Green ~ 3-Core Twisted', '', true, true), ('Flex', 'Neon Yellow ~ 3-Core Round', '', true, true), ('Flex', 'Neon Yellow ~ 3-Core Twisted', '', true, true), ('Flex', 'Nickel Metal Braid ~ 3-Core Round', '', true, true), ('Flex', 'Old Gold ~ 3-Core Round', '', true, true), ('Flex', 'Old Gold ~ 3-Core Twisted', '', true, true), ('Flex', 'Orange ~ 3-Core Round', '', true, true), ('Flex', 'Orange ~ 3-Core Twisted', '', true, true), ('Flex', 'Pea Green ~ 3-Core Round', '', true, true), ('Flex', 'Pea Green ~ 3-Core Twisted', '', true, true), ('Flex', 'Poppy Red ~ 3-Core Round', '', true, true), ('Flex', 'Poppy Red ~ 3-Core Twisted', '', true, true), ('Flex', 'Purple ~ 3-Core Round', '', true, true),('Flex', 'Purple ~ 3-Core Twisted', '', true, true), ('Flex', 'Racing Green ~ 3-Core Round', '', true, true), ('Flex', 'Racing Green ~ 3-Core Twisted', '', true, true), ('Flex', 'Red & W Herringbone ~ 3-Core Round', '', true, true), ('Flex', 'Red & W Herringbone ~ 3-Core Twisted', '', true, true), ('Flex', 'Rose ~ 3-Core Round', '', true, true), ('Flex', 'Rose ~ 3-Core Twisted', '', true, true), ('Flex', 'Royal Blue ~ 3-Core Round', '', true, true), ('Flex', 'Royal Blue ~ 3-Core Twisted', '', true, true), ('Flex', 'Satinwood Gold ~ 3-Core Round', '', true, true), ('Flex', 'Satinwood Gold ~ 3-Core Twisted', '', true, true), ('Flex', 'Silver & White Herringbone ~ 3-Core Round', '', true, true), ('Flex', 'Silver ~ 3-Core Round', '', true, true), ('Flex', 'Silver ~ 3-Core Twisted', '', true, true),('Flex', 'Tisane ~ 3-Core Round', '', true, true), ('Flex', 'Tisane ~ 3-Core Twisted', '', true, true), ('Flex', 'White ~ 3-Core Round', '', true, true), ('Flex', 'White ~ 3-Core Twisted', '', true, true), ('Flex', 'Yellow ~ 3-Core Round', '', true, true), ('Flex', 'Yellow ~ 3-Core Twisted', '', true, true), ('Bulb', 'Incandescent Golfball ~ E14 (SES)', '- Wattage:\n- Height: \n- Diameter: \n- Brands / Suppliers: ', true, true), ('Bulb', 'Incandescent Candle ~ E14 (SES)', '- Wattage:\n- Height: \n- Diameter: \n- Brands / Suppliers: ', true, true), ('Bulb', 'LED Candle ~ E14 (SES)', '- Wattage:\n- Height: \n- Diameter: \n- Brands / Suppliers: ', true, true), ('Bulb', 'LED Golfball ~ E14 (SES)', '- Wattage:\n- Height: \n- Diameter: \n- Brands / Suppliers: ', true, true), ('Bulb', 'Halogen Golfball ~ E27 (ES)', '- Wattage:\n- Height: \n- Diameter: \n- Brands / Suppliers: ', true, true), ('Bulb', 'LED Golfball ~ E27 (ES)', '- Wattage:\n- Height: \n- Diameter: \n- Brands / Suppliers: ', true, true), ('Bulb', 'Incandescent Squirrel ~ E27 (ES)', '- Wattage:\n- Height: \n- Diameter: \n- Brands / Suppliers: ', true, true), ('Bulb', 'Incandescent Picture ~ E14 (SES)', '- Wattage:\n- Height: \n- Diameter: \n- Brands / Suppliers: ', true, true), ('Bulb', 'Incandescent Golfball ~ E27 (ES)', '- Wattage:\n- Height: \n- Diameter: \n- Brands / Suppliers: ', true, true), ('Bulb', 'Incandescent Lantern ~ E27 (ES)', '- Wattage:\n- Height: \n- Diameter: \n- Brands / Suppliers: ', true, true), ('Bulb', 'Compact Fluorescent ~ E14 (SES)', '- Wattage:\n- Height: \n- Diameter: \n- Brands / Suppliers: ', true, true), ('Glass', 'Amber ~ Bubble', '', true, false), ('Glass', 'Amber ~ Diamond', '', true, false), ('Glass', 'Amber ~ Optic', '', true, false), ('Glass', 'Amber ~ Plain', '', true, false), ('Glass', 'Aubergine ~ Bubble', '', true, false), ('Glass', 'Aubergine ~ Diamond', '', true, false), ('Glass', 'Aubergine ~ Optic', '', true, false), ('Glass', 'Aubergine ~ Plain', '', true, false), ('Glass', 'Black ~ Bubble', '', true, false), ('Glass', 'Black ~ Diamond', '', true, false), ('Glass', 'Black ~ Optic', '', true, false), ('Glass', 'Black ~ Plain', '', true, false), ('Glass', 'Bronze ~ Bubble', '', true, false), ('Glass', 'Bronze ~ Diamond', '', true, false), ('Glass', 'Bronze ~ Optic', '', true, false), ('Glass', 'Bronze ~ Plain', '', true, false), ('Glass', 'Cherry ~ Bubble', '', true, false), ('Glass', 'Cherry ~ Diamond', '', true, false), ('Glass', 'Cherry ~ Optic', '', true, false), ('Glass', 'Cherry ~ Plain', '', true, false), ('Glass', 'Clear ~ Bubble', '', true, false), ('Glass', 'Clear ~ Diamond', '', true, false), ('Glass', 'Clear ~ Optic', '', true, false), ('Glass', 'Clear ~ Plain', '', true, false), ('Glass', 'Copper Blue ~ Bubble', '', true, false), ('Glass', 'Copper Blue ~ Diamond', '', true, false), ('Glass', 'Copper Blue ~ Optic', '', true, false), ('Glass', 'Copper Blue ~ Plain', '', true, false), ('Glass', 'Denim ~ Bubble', '', true, false), ('Glass', 'Denim ~ Diamond', '', true, false), ('Glass', 'Denim ~ Optic', '', true, false), ('Glass', 'Denim ~ Plain', '', true, false), ('Glass', 'Eel ~ Bubble', '', true, false), ('Glass', 'Eel - Diamond', '', true, false), ('Glass', 'Eel ~ Optic', '', true, false), ('Glass', 'Eel ~ Plain', '', true, false), ('Glass', 'Forest Green ~ Bubble', '', true, false), ('Glass', 'Forest Green ~ Diamond', '', true, false), ('Glass', 'Forest Green ~ Optic', '', true, false), ('Glass', 'Forest Green ~ Plain', '', true, false), ('Glass', 'Grey ~ Bubble', '', true, false), ('Glass', 'Grey ~ Diamond', '', true, false), ('Glass', 'Grey ~ Optic', '', true, false), ('Glass', 'Grey ~ Plain', '', true, false), ('Glass', 'Jade ~ Bubble', '', true, false), ('Glass', 'Jade ~ Diamond', '', true, false), ('Glass', 'Jade ~ Optic', '', true, false), ('Glass', 'Jade ~ Plain', '', true, false), ('Glass', 'Ochre ~ Bubble', '', true, false), ('Glass', 'Ochre ~ Diamond', '', true, false), ('Glass', 'Ochre ~ Optic', '', true, false), ('Glass', 'Ochre ~ Plain', '', true, false), ('Glass', 'Peach ~ Bubble', '', true, false), ('Glass', 'Peach ~ Diamond', '', true, false), ('Glass', 'Peach ~ Optic', '', true, false), ('Glass', 'Peach ~ Plain', '', true, false), ('Glass', 'Purple ~ Bubble', '', true, false), ('Glass', 'Purple ~ Diamond', '', true, false), ('Glass', 'Purple ~ Optic', '', true, false), ('Glass', 'Purple ~ Plain', '', true, false), ('Glass', 'Ruby ~ Bubble', '', true, false), ('Glass', 'Ruby ~ Diamond', '', true, false), ('Glass', 'Ruby ~ Optic', '', true, false), ('Glass', 'Ruby ~ Plain', '', true, false), ('Glass', 'Sargasso ~ Bubble', '', true, false), ('Glass', 'Sargasso ~ Diamond', '', true, false), ('Glass', 'Sargasso ~ Optic', '', true, false), ('Glass', 'Sargasso ~ Plain', '', true, false), ('Glass', 'Steel ~ Bubble', '', true, false), ('Glass', 'Steel ~ Diamond', '', true, false), ('Glass', 'Steel ~ Optic', '', true, false), ('Glass', 'Steel ~ Plain', '', true, false), ('Glass', 'Tea ~ Bubble', '', true, false), ('Glass', 'Tea ~ Diamond', '', true, false), ('Glass', 'Tea ~ Optic', '', true, false), ('Glass', 'Tea ~ Plain', '', true, false), ('Metal', 'Antique Brass', '', true, false), ('Metal', 'Black', '', true, false), ('Metal', 'Brass - Polished', '', true, false), ('Metal', 'Brass - Matte', '', true, false), ('Metal', 'Brass - Raw', '', true, false), ('Metal', 'Bronze - Matte', '', true, false), ('Metal', 'Bronze - Polished', '', true, false), ('Metal', 'Copper', '', true, false), ('Metal', 'Nickel', '', true, false), ('Metal', 'Nickel - Brushed', '', true, false), ('Metal', 'White', '', true, false), ('Metal', 'Zinc', '', true, false);



create table contacts(type text, name text, active boolean);

insert into contacts (type, name, active) values ('Customer', 'Ted Baker', true), ('Customer', 'Ed Bondsman', true), ('Customer', 'Phil Tester', false), ('Customer', 'Acme Incorporated Limited Company PLC', true), ('Customer', 'We Sort', true), ('Customer', 'The Modern House', true), ('Customer', 'Heals', true), ('Customer', 'Woolworths', false), ('Customer', 'Walmart', false), ('Customer', 'Starbucks', false), ('Supplier, Customer', 'Optime Lighting', true), ('Supplier', 'Birch Engineering', true), ('Supplier', 'Lilleys', true), ('Supplier', 'Rovelli', true);
