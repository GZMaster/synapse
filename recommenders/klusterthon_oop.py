import pandas as pd
import json
from itertools import combinations
from sklearn.metrics.pairwise import cosine_similarity
from scipy.stats import percentileofscore

def rec(student_perf, course_tab, student_tab):
    spt = pd.DataFrame(student_perf)
    ct = pd.DataFrame(course_tab)
    st = pd.DataFrame(student_tab)

    st = st.drop(columns = ['first_name', 'last_name', 'email'])
    st.rename(columns={'id': 'Student_Id'}, inplace=True)
    merged_data = pd.merge(spt, st, on='Student_Id')
    students = merged_data

    # Filter rows where 'Column_A' is not equal to 'Column_B' for the same 'Student_Id'
    rows_to_drop = students[students['Course Id'] != students['Course_Id']]

    # Filter rows where there are duplicates in 'Student_Id'
    duplicates = students.duplicated(subset='Student_Id', keep=False)

    # Drop rows where 'Column_A' is not equal to 'Column_B' and there are duplicates in 'Student_Id'
    students = students.drop(rows_to_drop[duplicates].index)

    # Define the country proximity matrix
    country_proximity = {
        'Rwanda': {'Rwanda': 0, 'South Africa': 2, 'Kenya': 1, 'Ghana': 3, 'Nigeria': 4},
        'South Africa': {'Rwanda': 2, 'South Africa': 0, 'Kenya': 3, 'Ghana': 4, 'Nigeria': 1},
        'Kenya': {'Rwanda': 1, 'South Africa': 3, 'Kenya': 0, 'Ghana': 2, 'Nigeria': 3},
        'Ghana': {'Rwanda': 3, 'South Africa': 4, 'Kenya': 2, 'Ghana': 0, 'Nigeria': 1},
        'Nigeria': {'Rwanda': 4, 'South Africa': 1, 'Kenya': 3, 'Ghana': 1, 'Nigeria': 0}
    }

    # Encode gender based on the sex of each student
    def gender_encoding(student_gender, other_student_gender):
        if student_gender == other_student_gender:
            return 1
        else:
            return 0

    # Calculate features needed for cosine similarity
    def calculate_features(student, other_student):
        age_deviation = abs(student['Age'] - other_student['Age'])
        country_score = country_proximity[student['Country']][other_student['Country']]
        gender_score = gender_encoding(student['Gender'], other_student['Gender'])
        return [age_deviation, country_score, gender_score]

    # Predefined country_proximity dictionary and gender_encoding function ...

    # Calculate features needed for cosine similarity
    def calculate_features(student, other_student):
        age_deviation = abs(student['Age'] - other_student['Age'])
        country_score = country_proximity[student['Country']][other_student['Country']]
        gender_score = gender_encoding(student['Gender'], other_student['Gender'])
        
        # Calculate the absolute difference in IQ percentile scores (100 - percentile) for each student
        student_iq_percentile = 100 - percentileofscore(students['IQ_Score'], student['IQ_Score'])
        other_student_iq_percentile = 100 - percentileofscore(students['IQ_Score'], other_student['IQ_Score'])
        iq_score = abs(student_iq_percentile - other_student_iq_percentile)
        
        # Calculate the absolute difference in Score percentile scores (100 - percentile) for each student
        student_score_percentile = 100 - percentileofscore(students['Score'], student['Score'])
        other_student_score_percentile = 100 - percentileofscore(students['Score'], other_student['Score'])
        score_deviation = abs(student_score_percentile - other_student_score_percentile)
        
        # Return a vector of calculated feature values
        return [age_deviation, country_score, gender_score, iq_score, score_deviation]

    # Pair students using cosine similarity
    pairings_list = []  # Store pairs with cohort and course information
    students_grouped = students.groupby(['Cohort', 'Course Id'])

    for (cohort, course_id), group in students_grouped:
        # Create all possible pairs within the group
        potential_pairs = list(combinations(group.index, 2))

        # Track the best pair for each student
        best_pairs = {}

        for i, j in potential_pairs:
            student_features = calculate_features(group.loc[i], group.loc[j])
            other_student_features = calculate_features(group.loc[j], group.loc[i])

            # Calculate cosine similarity between the two students
            similarity = cosine_similarity([student_features], [other_student_features])[0][0]

            # Update the best pair if the current similarity is higher
            if i not in best_pairs or best_pairs[i]['similarity'] < similarity:
                best_pairs[i] = {'pair': j, 'similarity': similarity}
            if j not in best_pairs or best_pairs[j]['similarity'] < similarity:
                best_pairs[j] = {'pair': i, 'similarity': similarity}

        # Select the best pairs without repetition
    paired_students = set()
    for student, data in best_pairs.items():
        if student not in paired_students and data['pair'] not in paired_students:
            #pairs_with_details.append(((student, data['pair']), cohort, course_id))
            paired_students.add(student)
            paired_students.add(data['pair'])        
                # Add pairing as dict to pairings_list
            pairings_list.append({
                "Cohort": cohort,
                "Student1": student,
                "Student2": data['pair']
            })

    # Convert the list of dictionaries to a JSON string
    #pairings_json = json.dumps(pairings_list, indent=4)  # 'indent' for pretty-printing

    # Write the JSON string to a file
    #with open('pairings.json', 'w') as json_file:
        #json_file.write(pairings_json)

    #print("Pairings saved to 'pairings.json'")
    return pairings_list                                                                                                                      

# file_path = "recommenders/data/Student_Performance_Table.json"

# # Open the file and then load the JSON data
# with open(file_path, "r") as file:
#     a = json.load(file)

# file_path = "recommenders/data\Course_Table.json"

# # Open the file and then load the JSON data
# with open(file_path, "r") as file:
#     b = json.load(file)

# file_path = "recommenders/data\Student_Table.json"

# # Open the file and then load the JSON data
# with open(file_path, "r") as file:
#     c = json.load(file)

# print(a)
