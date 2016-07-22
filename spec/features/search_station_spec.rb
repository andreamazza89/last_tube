feature 'Feature-search station' do

  describe 'Stations selection' do

    scenario 'user enters "vic", clicks "search", system prints Victoria ' do
      visit('/tubes/search')  
      within('#fromStation') do 
        fill_in('fromStation', with: 'vic')
        click_button('from')
      end 
      expect(page).to have_content('Victoria')
    end

    scenario 'user enters "vic", clicks "search", system prints Victoria ' do
      visit('/tubes/search')  
      within('#toStation') do 
        fill_in('toStation', with: 'brix')
        click_button('to')
      end 
      expect(page).to have_content('Brixton')
    end
  end
end
