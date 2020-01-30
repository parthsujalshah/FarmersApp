def seed_required(area):
	total_area = area*30000 #square feet
	seed_for_1_acre = 20*30000/43600  #kg
	seed_required = area*seed_for_1_acre
	return seed_required

area = float(input("Enter area"))
print(seed_required(area))
