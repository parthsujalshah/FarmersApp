from keras.models import load_model
def fertilizer_prediction(test):
	model=load_model("fertilizer_model.h5")
	test = np.asarray(test)
	test = test.reshape(1,9)
	prediction = model.predict_classes(test)
	return prediction