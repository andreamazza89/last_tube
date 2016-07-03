feature 'Feature tests' do

  describe 'Home page' do
    scenario 'greets the user' do
      visit('/')  
      expect(page).to have_content('Welcome')
    end
  end


  describe 'Stations selection' do
    scenario 'user enters "vic", clicks "search", system prints Victoria ' do
      visit('/tubes/search')  
      within('#fromStation') do 
        fill_in('fromStation', with: 'vic')
        click_button('search')
      end 
      expect(page).to have_content('Victoria')
    end
  end

end
